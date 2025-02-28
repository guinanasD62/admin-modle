export function getS3BasePath() {
    const url = process.env.AWS_URL;
    // console.log("url ==>", url)
    if (!url) {
        console.error('Missing AWS_URL');
    }
    return `${url}`;

}
 