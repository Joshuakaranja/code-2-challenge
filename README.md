# Financial Goals Tracker 💰

A React application for tracking your financial goals with full CRUD operations using json-server.

## Features ✨

✅ **GET**: Load existing goals from db.json  
✅ **POST**: Add new financial goals  
✅ **PUT**: Update saved amounts for goals  
✅ **DELETE**: Remove goals with confirmation  
✅ **Responsive Design**: Works on all devices  
✅ **Progress Tracking**: Visual progress bars  
✅ **Form Validation**: Required field validation  
✅ **Error Handling**: User-friendly error messages  

## Setup Instructions 🚀

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the JSON Server (Required for data persistence)
```bash
npm run server
```
This starts json-server on `http://localhost:3001` and watches `db.json`

### 3. Start the Development Server (New Terminal)
```bash
npm run dev
```
This starts the React app on `http://localhost:5173`

### 4. Open Your Browser
Go to `http://localhost:5173` to view the application

## Usage Guide 📝

### Adding Goals
1. Fill out the form with:
   - Goal Name
   - Target Amount ($)
   - Category
   - Deadline Date
2. Click "Add Goal"
3. Goal is saved to db.json automatically

### Updating Progress
1. Find your goal in the list
2. Use the "Update saved amount" input
3. Enter new amount and press Tab/Enter
4. Progress bar updates automatically

### Deleting Goals
1. Click the red "×" button on any goal
2. Confirm deletion in the popup
3. Goal is permanently removed from db.json

## API Endpoints 🌐

The app makes HTTP requests to these endpoints:

- **GET** `http://localhost:3001/goals` - Fetch all goals
- **POST** `http://localhost:3001/goals` - Add new goal
- **PUT** `http://localhost:3001/goals/:id` - Update existing goal
- **DELETE** `http://localhost:3001/goals/:id` - Delete goal

## Data Structure 📊

Each goal in db.json has this structure:
```json
{
  "id": "1",
  "name": "Travel Fund - Japan",
  "targetAmount": 5000,
  "savedAmount": 3200,
  "category": "Travel",
  "deadline": "2025-12-31",
  "createdAt": "2024-01-15"
}
```

## Available Scripts 📜

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Start json-server

## Troubleshooting 🔧

### Error: "Make sure to run: npm run server"
- The json-server is not running
- Run `npm run server` in a separate terminal

### Port 3001 is in use
- Stop any process using port 3001
- Or modify the port in package.json server script

### Goals not persisting
- Check that json-server is running
- Check browser console for network errors
- Verify db.json exists and is writable

## Tech Stack 🛠️

- **Frontend**: React 19, Vite
- **Backend**: json-server
- **Styling**: CSS3 with animations
- **State Management**: React useState/useEffect
- **HTTP Client**: Fetch API

## Future Enhancements 🔮

- [ ] User authentication
- [ ] Categories filtering
- [ ] Data visualization charts
- [ ] Export to CSV
- [ ] Goal reminders
- [ ] Dark theme

---

**Happy Saving! 💸**
