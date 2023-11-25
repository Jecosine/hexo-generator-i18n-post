'use-strict';

var fs = require('hexo-fs');
var frontMatter = require('hexo-front-matter');
const { load } = require('js-yaml');
const helper = require('./lib/helpers');

function loadConfig() {
    if (!hexo.config.hasOwnProperty('i18n_post_generator')) {
        hexo.log.info('i18n_post config not found, exiting');
        return null;
    }
    var config = hexo.config.i18n_post_generator;
    return config;
}

function postGenerator(locals) {
    let config = loadConfig();
    let allPosts = locals.posts;
    let defaultLang = hexo.config.language;
    let identifier = config.identifier || 'slug';

    if (Array.isArray(defaultLang)) {
        defaultLang = defaultLang[0];
        hexo.log.debug(`default language: ${defaultLang}`);
    } else if (typeof defaultLang === 'undefined') {
        hexo.log.warn('default language not defiend, using `en` as default language');
    }

    let postDict = helper.getPostDict(allPosts, defaultLang, identifier);
    // print postDict
    for (let slug in postDict) {
        let message = `slug: ${slug}`;
        for (let lang in postDict[slug]) {
            message += `, ${lang}`;
        }
        hexo.log.info(message);
    }
    let postList = [];
    for (let id in postDict) {
        let defaultPath = null;
        if (typeof postDict[id][defaultLang] === 'undefined') {
            hexo.log.warn(`[i18n post generator]: default language ${defaultLang} not found in post ${id}`);
        } else {
            defaultPath = postDict[id][defaultLang].path;
        }
         
        let message = "";
        for (let lang in postDict[id]) {
            if (lang === defaultLang) {
                postList.push({
                    path: `${defaultPath}`,
                    data: postDict[id][lang].content
                });
                message = `[i18n post generator]: generating post: ${defaultPath}, available languages: ${lang} |`;
                continue
            }
            if (defaultPath === null) {
                defaultPath = postDict[id][lang].path;
                message = `[i18n post generator]: generating post: ${defaultPath}, available languages: `;
            }
            message += ` ${lang} |`;
            let post = postDict[id][lang];
            if (config.group_by === 'post') {
                post.path = `${defaultPath}/${lang}`;
            } else if (config.group_by === 'lang') {
                post.path = `${lang}/${defaultPath}`;
            } else {
                hexo.log.warn(`[i18n post generator]: unknown group_by option: ${config.group_by}, using default: post`);
                post.path = `${defaultPath}/${lang}`;
            }
            postList.push({
                path: `${post.path}`,
                data: postDict[id][lang].content
            });
        }
        hexo.log.info(message);        
    }
    return postList;
}

hexo.extend.generator.register('i18n_post_generator', postGenerator);