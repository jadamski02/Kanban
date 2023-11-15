import React from 'react';
import ReactDom from 'react-dom/client';
import TablinaKanbanKontener from './TablicaKanbanKontener.js'

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <TablinaKanbanKontener />
    </React.StrictMode>
);