E-Learning User and Course Registration JWT Claims Service template

This is a user and course JWT template for an e-learning site. JWT claims are used to associate users and their registered courses. JWT authorization is utilized for HTTP routes. The frontend is build with React and currently only supports user login (so you will need to create users and courses via Postman or something similar).


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

1. Download the zip and extract
2. cd into /client and npm install
3. Open /Api directory and update the appsettings.json file (this is where you can link your own sql server db)
Your appsettings.json file should follow this template: { "Logging": { "LogLevel": { "Default": "Information", "Microsoft": "Warning", "Microsoft.Hosting.Lifetime": "Information" } }, "AllowedHosts": "*", "ConnectionStrings": { "ProductionConnect": "[DATABASE LOGIN STRING GOES HERE]" } }
4. cd into /Api and type "dotnet run" to start the project
