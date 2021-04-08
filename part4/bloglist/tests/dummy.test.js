const dummy = require('../utils/list_helper').dummy

test('dummy test', () => {
    const blogs = []
    const res = dummy(blogs)

    expect(res).toBe(1)
})