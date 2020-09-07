UPDATE: As of 9/7/2020, this project has been merged with my portfolio website. Further development can be seen here: https://github.com/tonyvu1/home

Learning Management System

This is my most current programming project and it is also the most complex project I have created. It is a light-weight learning management system. Users will be able to create an account, login, register to courses, view lectures, take tests, and earn points with a certificate each time they complete a course. In addition, role based JWT authorization will be utilized so that Admin roles can delete/edit users and add/edit courses on the system. User roles will only be able to perform bare minimum actions on the system.

KEY TECHNIQUES:
- Role based authorization with JWTs. 
- JWT claims used for course registrations + database relationships. Each time a user registers for a course, their user ID is automatically associated with that specific course registration's ID. Whenever the user calls /registrations/getall HTTP GET method, only their associated
courses are returned. (Admins are able to call /registrations/getlist HTTP GET method to see all existing registrations)
- DTOs utilized for encapsulating data to send from one subsystem to another, i.e. data from http body reqeuest to backend

Technologies used:
- .NET Core 3.1
- C#
- HTML
- CSS
- Bootstrap
- JavaScript
- JSX
- React
- Redux
- SQL Server db

If you'd like to download the project and run it, follow these instructions:

1. Download the zip and extract
2. cd into /client and npm install
3. Open /Api directory and create an appsettings.json file (this is where you can link your own sql server db)
Your appsettings.json file should follow this template: { "Logging": { "LogLevel": { "Default": "Information", "Microsoft": "Warning", "Microsoft.Hosting.Lifetime": "Information" } }, "AllowedHosts": "*", "ConnectionStrings": { "ProductionConnect": "[DATABASE LOGIN STRING GOES HERE]" } }
4. cd into /Api and type "dotnet run" to start the project

Problems I faced during development: 
- Handling database schema with relationships. It was challenging to design a database schema to account for the various one-to-many and many-to-many relationships that existed. This is where I realized that database design is critical before code implementation. 
- Learning how to implement and work with JWTs for authorization. One issue with this was deciding whether to store the JWT in Redux state, localstorage, or cookies. Each came with their respective tradeoffs. 

-Tony
