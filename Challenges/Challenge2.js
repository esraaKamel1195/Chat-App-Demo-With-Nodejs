// Convert for error handling
MyFunction() {
    request((result,err) => {
        console.log(result, err);
    })
}

// Solution
async MyFunction() {
    try {
        let result = await request();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}