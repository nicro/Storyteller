function gen_random_id(): string {
    return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g,"");
};

export { gen_random_id }