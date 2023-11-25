const { describe } = require("node:test");
const should = require('chai').should();
const { getPostDict } = require('../lib/helpers');

describe('i18n_post_generator', () => {

    it('test empty posts', () => {
        let posts = [];
        let defaultLang = 'en';
        let identifier = 'slug';
        let postDict = getPostDict(posts, defaultLang, identifier);
        postDict.should.be.empty;
    })
    it('test posts with one language', () => {
        let posts = [{
            slug: 'test-post',
            lang: 'en',
            path: 'test-post',
            title: 'test post'
        },
        {
            slug: 'test-post',
            lang: 'en',
            path: 'test-post',
            title: 'test post 1'
        }];
        let defaultLang = 'en';
        let identifier = 'slug';
        let postDict = getPostDict(posts, defaultLang, identifier);
        postDict.should.to.eql({
            'test-post': {
                'en': {
                    slug: 'test-post',
                    lang: 'en',
                    path: 'test-post',
                    title: 'test post 1'
                }
            }
        });
    })
})