function getPostDict(posts, defaultLang, identifier) {
    let postDict = {};
    posts.forEach(function (post) {
        // we use slug as the key of postDict, however, the slug will contains the parent folder name so we try to remove it
        // e.g. source/_posts/2018-01-01-hello-world.md, the slug will be 2018-01-01-hello-world, but for source/_posts/en/2018-01-01-hello-world.md
        // the slug will be en/2018-01-01-hello-world, we need to remove the en/ part
        let id = post.slug;
        if (identifier !== 'slug') {
            id = post[identifier];
            if (typeof id === 'undefined') {
                hexo.log.warn(`identifier ${identifier} not found in post ${post.slug}, using slug as identifier`);
                id = post.slug;
            }
        } else {
            let slugParts = id.split('/');
            if (slugParts.length > 1) {
                id = slugParts[slugParts.length - 1];
            }
        }
        let lang = post.lang || defaultLang;
        if (postDict.hasOwnProperty(id)) {
            // if lang is not defined in this post, the default lang set in hexo _config.yml will be used
            postDict[id][lang] = post;
        } else {
            let langDict = {};
            langDict[lang] = post;
            postDict[id] = langDict;
        }
    });
    
    return postDict;
}


exports.getPostDict = getPostDict;

