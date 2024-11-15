# Real-Time Chat Application

A browser-based chat application built with ASP.NET Core, SignalR, and SQLite.

## Features

- Real-time chat functionality using SignalR
- Message persistence using SQLite database
- Automatic loading of last 50 messages
- Simple and intuitive user interface

## Technologies Used

- ASP.NET Core 8.0
- SignalR for real-time communication
- Entity Framework Core with SQLite
- Razor Pages for the frontend

## Setup Instructions

1. Clone the repository 
```bash
git clone https://github.com/YOUR_USERNAME/ChatApplication.git
```
2. Navigate to the project directory
```bash
cd ChatApplication
```
3. Restore the dependencies
```bash
dotnet restore
```
4. Run the application
```bash
dotnet run
```

5. Open your browser and navigate to `http://localhost:5015`

## Usage

1. Enter your username
2. Type your message in the input field
3. Click Send or press Enter to send the message
4. Messages will appear in real-time for all connected users

## License

MIT License