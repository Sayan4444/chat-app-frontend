export default function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            // func.apply(this, args);
            func(args)
        }, delay);
    };
}

// timeoutId = setTimeout(func(args), delay)