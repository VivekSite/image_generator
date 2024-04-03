
Image generator is an web application which will generate some Images based on given preferences. This application uses pixels RESTapi for fetching the images. [visit website](viveksite.github.io/image_generator/)

## How to use

1. Select `Orientation`
2. Select `Size`
3. Select `number of images`
4. Press the `generate` button


Press the `Clear` button to clear the seach result.

## Development Environment

- Clone the repo
`
git clone https://github.com/VivekSite/image_generator.git
`
- Install Dependencies `npm i`
- ### Set Environment Variables
- login/register on the pixels website and get one api key from there.
```
# create .env file and add API_KEY field in it
API_KEY = <Add your pixels api key here>
```
- Now run the development server `npm start`
