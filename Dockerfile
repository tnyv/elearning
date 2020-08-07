FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
 
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["LMS.csproj", "LMS/"]
RUN dotnet restore "LMS/LMS.csproj"
WORKDIR "/src/HerokuDockerDeployment"
COPY . .
RUN dotnet build "HerokuDockerDeployment.csproj" -c Release -o /app/build
 
FROM build AS publish
RUN dotnet publish "HerokuDockerDeployment.csproj" -c Release -o /app/publish
 
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet HerokuDockerDeployment.dll