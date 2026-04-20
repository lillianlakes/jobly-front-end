## Jobly

### A full-stack job search application with AI-powered recommendations, job applications, and profile management

This project originally began as part of <a href="https://www.rithmschool.com/">Rithm School's</a> curriculum and was completed in collaboration with my partner <a href="https://github.com/stocktons">Sarah Stockton</a>.

Since then, I have expanded the app on my own to include AI-powered recommendations, a dedicated Recommendations page, skip/apply controls for recommended jobs, a polished custom UI, and additional frontend improvements beyond the original course requirements.

### Tech stack
- React
- Node.js
- Express
- Bootstrap
- PostgreSQL
- JSONSchema
- JSON Web Token
- bcrypt

## Live Demo
- Here is a live demo of the <a href="https://jobly.lillianlakes.com">Jobly</a> app.

### Getting started
In the project directory, run:
- `npm i` to install packages and dependencies

### Original project functionality
- Login, signup, and profile editing
- Search for jobs and companies
- View job and company details
- Apply for jobs
- Track applied jobs in the Applications tab

### Added enhancements by me
- AI-powered job recommendations
- Dedicated Recommendations tab
- Apply directly from recommended jobs
- Skip jobs you are not interested in
- Automatically refresh recommendations after apply/skip actions
- Show only the top 10 visible recommendations after filtering applied and skipped jobs
- Custom responsive UI and styling updates across the app
- Cleaner navigation and improved page layouts

### Features
- Authentication with <a href="https://jwt.io/">JSON Web Tokens</a>
- API calls are made to the <a href="https://github.com/lillianlakes/express-jobly">Jobly backend</a>
- AI recommendation scores are normalized and displayed consistently in the UI
