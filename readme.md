# Food Bell Patch Note

The Food Bell Patch Note is a solo project where I analyzed, designed, and developed a patch note system for the fictive website, Food Bell.

This project provided me with the opportunity to enhance my skills in React and learn .Net, as it was my first exposure to the framework.

I took on all aspects of development independently, showcasing my skills and passion for web development. The project reflects my commitment to continuous learning and improvement in the field.

Feel free to explore the features of the Food Bell Patch Note, and reach out if you have any questions or feedback.

# 1. Overview

The Food Bell Patch Note consists of two main sections: the admin and user interfaces. Users can log in as either an admin or a regular user to access different features and functionalities.

### **<span style="color:#3c84c5">Admin section</span>**

The admin section offers a range of tools and capabilities to effectively manage and enhance the Food Bell website. Key features of the admin section include:

1. **Patch Note - main page:** Browse through a curated list of articles detailing the latest updates, releases, and corrections made on the Food Bell website. Stay informed about the ongoing improvements and additions.

2. **Customer Recommendations:** Access a dedicated section to view recommendation messages submitted by Food Bell's valued customers. This interactive platform allows users to share their ideas and suggestions to help improve the main website.

3. **Article Management** Take full control over the content of the patch note by adding, deleting, and modifying articles. This functionality enables the admin to keep the patch note up to date with the latest changes, ensuring comprehensive coverage of all updates.

4. **Newsletter Management:** Utilize the newsletter management feature to create engaging newsletters for customers. Select articles of interest and schedule their publication date, ensuring customers receive regular updates tailored to their preferences.

### **<span style="color:#3c84c5">User section</span>**

The user section of the Food Bell Patch Note allows them to stay informed and engaged with the latest updates.

1. **Article Viewing:** Users can explore the comprehensive collection of articles within the patch note, gaining insights into the latest updates, releases, and corrections made on the Food Bell website. Stay up to date with the continuous improvements and additions.

2. **Recommendation Messages:** Users have the opportunity to contribute their ideas and recommendations to enhance the main Food Bell website. If users have any recommendations or suggestions for improvement, they can leave a message via their interface.

# Features

**Multi-Language Support:** The Food Bell Patch Note website is available in three languages: English, French, and Dutch. Users can easily switch between languages to access content in their preferred language, enhancing accessibility and user experience.

# Technology Stack

The Food Bell Patch Note project was developed within a bootcamp, serving as an opportunity to gain hands-on experience with cutting-edge technologies. The project was built using the following technologies:

**React - ASP.NET Core (C#) - MySQL**

# Installation:

To access the front-end of the Food Bell Patch Note, you can visit the deployed version at the following link:
[Food Bell Patch Note Front-end](https://main--patch-note-foodbell.netlify.app/)
Feel free to explore the interface and navigate through the patch note articles.

**However, please note that the backend part of the project could not be deployed at this time.**

To experience the full functionality of the website, please follow the instructions below to set up the project locally:

Clone the repository

```sh
git clone
```

Navigate to the project directory: Use the command line to navigate to the "patchnote" directory within the cloned repository.

```sh
cd patchnote
```

Switch to the Docker branch: Once inside the "patchnote" directory, switch to the "docker" branch by executing the command: git checkout docker.

```sh
git checkout docker
```

Start Docker: Ensure that Docker is installed on your system. Start Docker to enable containerization for the project.

Build and launch the containers: Run the following command to build and launch the Docker containers: docker-compose up --build.

```sh
docker-compose up --build
```

Following these steps will set up the necessary environment to run the Food Bell Patch Note locally. You can then access both the front-end and back-end functionalities of the website on your machine.

If you encounter any issues during the setup process or have any further questions, please don't hesitate to reach out for assistance. Enjoy exploring the Food Bell Patch Note!

## Backend

-   Go to PatchNote.Api

```sh
dotnet run
```

### How to start the project

1. Set up the database. Create the database patch_note and import the tables that are accessible in DBTable folder
2. Connection to the database.
   The settings are in appsettings.json
   You need to complete the connection strings to APSCHOOL, PATCHNOTE and HANGFIRE.
   [Hangfire](https://www.hangfire.io/) allows to schedule jobs (sending the newsletter) on a specific date.
   Hangfire will create its own tables. You can either create a new database or create the tables in the PATCHNOTE.

#### Autre

Translation of modules are in NewsletterHelper

---

## Frontend

### Installer un environnement de développement

-   Installer NodeJS.
-   Vérifier que NodeJS est installé.

```sh
npm --version
```

-   Clôner le dépôt.
-   Se rendre dans le dossier du repository _ClientApp_.
-   Installer les modules nécessaires à React.

```sh
npm install
```

-   Démarrer le projet à l'aide de React.

```sh
npm run start
```

-   Votre machine est prête ! 😀
