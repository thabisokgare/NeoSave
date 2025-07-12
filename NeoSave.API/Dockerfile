# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build-env
WORKDIR /app

# Copy csproj files and restore as distinct layers
COPY NeoSave.API/NeoSave.API.csproj NeoSave.API/
COPY NeoSave.Application/NeoSave.Application.csproj NeoSave.Application/
COPY NeoSave.Infrastructure/NeoSave.Infrastructure.csproj NeoSave.Infrastructure/
COPY NeoSave.Domain/NeoSave.Domain.csproj NeoSave.Domain/
RUN dotnet restore "NeoSave.API/NeoSave.API.csproj"

# Copy everything else
COPY . .

WORKDIR /app/NeoSave.API
RUN dotnet publish "NeoSave.API.csproj" -c Release -o out

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build-env /app/NeoSave.API/out .

EXPOSE 80
ENTRYPOINT ["dotnet", "NeoSave.API.dll"]
