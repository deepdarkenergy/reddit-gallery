import AbstractPost from './AbstractPost';
import { RedditPostType } from './RedditPostType';

export default class ImagePost extends AbstractPost {
    public previewUrl: string;
    public imageUrl: string;

    constructor(title: string, author: string, upvotes: number, link: string, id: string, previewUrl: string, imageUrl: string) {
        super(title, author, upvotes, link, id, RedditPostType.Image);
        this.imageUrl = imageUrl;
        this.previewUrl = this.getPreviewUrl(previewUrl);

        //remember to validate after initialising
        super.validate();
    }

    private getPreviewUrl(previewUrl: string): string {
        if(previewUrl) {
            return previewUrl;
        } else {
            return this.imageUrl;
        }
    }

    validatePost(): boolean {
        if (this.imageUrl && this.previewUrl) {
            return true;
        } else {
            return false;
        }
    }
}