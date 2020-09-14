import { Routes, RouterModule } from '@angular/router';

const financeManagementRoutes: Routes = [
    {
        path: 'finance',
        children: [
            { path: '', redirectTo: 'receipt', pathMatch: 'full' }
        ]
    },

];
export const FinanceManagementRouting = RouterModule.forRoot(financeManagementRoutes);