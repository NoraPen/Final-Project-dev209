## About the Project
MiniCloset is a multi-page React application designed for buying and selling children's clothing. Users can create new listings, preview them before posting, and browse items categorized by Baby, Boys, Girls, Pajamas, Swim, and more. The application features authentication, responsive design, reusable components, and an intuitive user interface. The project is deployed through Vercel at https://final-project-dev209.vercel.app/

## Setup Instructions
To set up the project, clone the repository using the command git clone https://github.com/NoraPen/Final-Project-dev209.git, then navigate to the project folder with cd minicloset. Install the dependencies by running npm install, and start the application locally using npm start.

## Technologies Used
The app is built with React using functional components and hooks. React Router handles navigation between pages. CSS, with Flexbox and Grid, is used for layout styling. Create React App is used for bundling, and Vercel is used for deployment. The Context API may be implemented for global state management in future updates.

## Reusable Components
Five reusable components have been developed. Navbar.js manages site-wide navigation. Footer.js ensures consistent content across all pages. ProductCard.js displays individual product listings. AuthForm.js provides a reusable form for login forms. ConfirmButton.js is a reusable button that adds a confirmation check before submitting.

## Pages Implemented
Implemented pages include Home, Buy, Sell, Sell Preview, and User Account. Each page is routed individually and features consistent navigation.

## Authentication
Authentication features like login and signup are implemented including protected routes to restrict access to pages like Sell, and user-specific content that will be shown after login.

## Data Management
For data management, users can create product listings through the Sell form. The Buy page displays current listings. Update and delete features are avalible through the sell form and user history page. Client-side validation ensures only complete data is submitted.

## API Integrations
Firebase is integrated for user authentication and data storage through Firestore. Cloudinary is used for image hosting. Both APIs include proper error handling and display loading states while fetching or uploading data.

## Known Issues
Known limitations include previous merge conflicts that affected layout and temporarily removed images, but we solved the problem.
The code includes comments explaining logic where necessary, especially in SellForm.js. Formatting is consistent, with clear variable names and organized structure.

## Code Quality
This project fulfills key technical, UI, and UX requirements. It uses React Router with more than four distinct routes, manages state using hooks, includes five reusable components, supports responsive design, and features consistent layout and navigation. Form validation provides basic user feedback. Accessibility improvements are planned.

## Final Notes
This README includes setup instructions, feature overviews, and code structure details. API documentation will be added after integration. The codebase is clean, well-commented.
