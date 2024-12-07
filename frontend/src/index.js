import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'

//this creates a virtual DOM for the react app
const root = createRoot(document.getElementById('root'));   //this creates the root element for the react app which is the div with id root in the index.html file
root.render(<App />); //this renders the react app to the root element which is the div with id root in the index.html file
