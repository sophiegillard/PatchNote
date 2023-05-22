export const toggleVisibility = (setIsVisible) => {
    if (window.scrollY > 400) {
        setIsVisible(true);
    } else {
        setIsVisible(false);
    }
};