
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        const requiredRoles = route.data?.['roles'] as Array<string>;
        if (requiredRoles) {
            if (authService.hasRole(requiredRoles)) {
                return true;
            } else {
                // Redirect to home or unauthorized page if role doesn't match
                // For now, just return false or redirect to home
                return router.createUrlTree(['/']);
            }
        }
        return true;
    }

    return router.createUrlTree(['/login']);
};
