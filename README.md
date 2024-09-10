- Handle files in MERN application.

  - Files are always important to use.
  - How Express can be given super power to Handle Images.
  - Handle cookie parser
  - File handing using `multer`
    - Responsible for handling files including.
    - Disc storage in multer
    - we will insert multer inbetween the route where we are handling the post request.
    - Once file is saved in local server, it will then be sent to Cloudinary.
      - Configure Cloudinary.
      - fs (file storage node method) using this inbuilt method, we will use it.

- Hooks & Methods in Mongoose

  - Mongoose middleware, refer to Mongoose documentation for details.
  - Mongoose provides prehooks & posthooks.
  - Majorly we would like to write logis related to the models within Controller
  - There are however cases where the logic is so much associated with the Model that we make it as part of mongoose method.
    - Example of such case is the Password Encryption.
    - We want to save the password in an encrypted form.

- Making use of MongoDb provides Aggregation Pipeline.
  - This inheriently means it helps us create complex aggregate queries.
  - To make use of this, we are making use of a special library - `mongoose-aggregate-paginate-v2`

Each controller will have its own Route Handler.

Standardise the way we handle few things in the application.

- Introduce a way to handle all request & resposne & try catch
  API response & Error Response are always in Class format ?? == whyyyy ?
