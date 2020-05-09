import ImagePost from '@/modals/ImagePost';
import { RedditPostType } from '@/modals/RedditPostType';
import AbstractPost from '@/modals/AbstractPost';
import VideoPost from '@/modals/VideoPost';

interface IResponse {
    success: Boolean,
    after?: String,
    posts?: AbstractPost[]
}

export async function getSubredditPosts(subreddit: string, after?: string) {
    const URL = after ? `https://www.reddit.com/r/${subreddit}.json?after=${after}` : `https://www.reddit.com/r/${subreddit}.json`;

    const res = await fetch(URL);

    let response: IResponse = {
        success: false,
    }

    if(res.ok){
        const json = await res.json();
        console.log('Res: ', json);
        const posts: AbstractPost[] = [];

        json.data.children.forEach((item:any) => {
            const title = item.data.title;
            const author = item.data.author;
            const upvoltes = item.data.ups;
            const id = item.data.id;
            const link = 'www.reddit.com' + item.data.permalink;

            let contentType: RedditPostType;
            switch(item.data.post_hint){
                case RedditPostType.Image:
                    const imageUrl = item.data.url;
                    let previewUrl = '';
                    if(item.data.preview?.images[0]?.resolutions) {
                        const previews = item.data.preview.images[0].resolutions.filter((img:any) => img.width > 500 && img.width < 1500);
                        previewUrl = previews[0]?.url;
                        previewUrl = previewUrl && previewUrl.replace(/&amp;/g, '&');
                    }
                    posts.push(new ImagePost(title, author, upvoltes, link, id, previewUrl, imageUrl));
                    break;
                case RedditPostType.Link:
                    contentType = RedditPostType.Link;
                    break;
                case RedditPostType.Text:
                    contentType = RedditPostType.Text;
                    break;
                case RedditPostType.Video:
                    const videoUrl = item.data.url;
                    posts.push(new VideoPost(title, author, upvoltes, link, id, videoUrl));
                    break;
                default:
                    contentType = RedditPostType.Undefined;
            }
        });

        response.success = true;
        response.after = json.data.after;
        response.posts = posts;

        return response;
    } else {
        console.error('getSubredditPosts failed: ', res.statusText);
        return response;
    }
}