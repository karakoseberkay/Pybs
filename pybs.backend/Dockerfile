

# .NET Core SDK tabanlı Docker imajını kullanın
FROM mcr.microsoft.com/dotnet/sdk:6.0.413 AS build
WORKDIR /app

# Backend dosyalarını kopyala
COPY pybs.backend.api/pybs.backend.api.csproj pybs.backend/pybs.backend.api/
COPY pybs.backend.sln pybs.backend/

# Backend projelerini restore et
RUN dotnet restore pybs.backend/pybs.backend.api/pybs.backend.api.csproj

# Backend kodunu kopyala ve build et
COPY pybs.backend.api/ pybs.backend/pybs.backend.api/
WORKDIR /app/pybs.backend/pybs.backend.api
RUN dotnet build pybs.backend.api.csproj -c Release -o /app/build

# Backend kodunu publish et
RUN dotnet publish pybs.backend.api.csproj -c Release -o /app/publish

# Yeni aşama başlat
FROM mcr.microsoft.com/dotnet/aspnet:6.0.21 AS backend
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80
ENV ASPNETCORE_URLS=http://*:80
ENTRYPOINT ["dotnet", "pybs.backend.api.dll"]
