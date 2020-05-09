import { RedditPostType } from './RedditPostType';

export default abstract class AbstractPost {
    public title: string;
    public author: string;
    public upvotes: number;
    public link: string;
    public id: string;
    public contentType: RedditPostType;
    public isValid = false;


    constructor(title: string, author: string, upvotes: number, link:string, id:string, contentType:RedditPostType) {
        this.title = title;
        this.author = author;
        this.link = link;
        this.upvotes = upvotes;
        this.id = id;
        this.contentType = contentType;
    }

    validate(): void {
        if(this.title && this.author && this.upvotes && this.link && this.id && this.contentType) {
            this.isValid = this.validatePost();
        } else {
            this.isValid = false;
        }
    }

    abstract validatePost(): boolean;
}