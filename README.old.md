# ia-react-redux-firebase-example
A sample IA React-Redux-Firebase app example

# Steps to initialize

## Prerequisites

You should have created a project already at firebase.google.com. Please
make note of the Google user you used to create the project, also, the project's
name as well.

Use PowerShell for the following.

Go to the parent directory of your proposed project, then:

```
npm install -g firebase-tools
npx create-react-app yourappname
```

If you are using powershell, it is time to issue this as well: (issue this
whenever you have a problem executing the firebase command)

```
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser
```

After that, issue `firebase login`

Then login with the Google account of your choice, and allow Firebase access
to your account.

To make sure you see your project, issue `firebase projects:list`, you should
see your project there.

Now you have to create a web app in your project: `firebase apps:create --project your-project-id`

Choose `Web`, name it, and remember its ID.

Change into your project's folder, then: `firebase init`, then choose the
following:
- Database
- Firestore
- Hosting
- Storage
- Emulators
- Use an existing project, then select your project
- select all the default answers
- Configure as a single-page-app: yes
- when it asks to overwrite your public/index.html file, back up that file,
  then choose yes
- Emulators setup:
  - Firestore
  - Database
  - Hosting
  - Pubsub
- Firestore: port to use: 8090
- Database emulator: 8091
- Hosting emaultor: 8092
- Pubsub emulator: 8093
- Download emulators: yes

Finally: rename public/index.html as firebase.html, and rename the backed-up
index.html to public/index.html

To finish installation, issue `npm install --save react-router react-router-dom redux react-redux redux-thunk firebase react-redux-firebase redux-firestore`

Create an src/config directory, create an fb.js in it, then issue 
`firebase apps:sdkconfig`, choose your app, then copy the configuration
into the fb.js. Replace `firebase.initializeApp(` with `const config =`,
and `});` in the last line as 
```
};
export default config;
```
