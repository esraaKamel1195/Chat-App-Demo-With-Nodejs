// Convert the following function to async/await

MyFunction() {
    GetMessages((list) => {
        console.log(list);
    });
}

// Solution

async MyFunction() {
    let messages = await GetMessages();
    console.log(messages);
}