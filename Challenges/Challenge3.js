// Write a passing test

it(`Should multibly 2 by 6`, (done) => {
    expect(myFunction(2,6)).toBe(12);
})

function myFunction(x, y) {
    return x*y;
}