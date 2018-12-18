module.exports = bundler => ({
    after(app, server){
        app.get('/src/index.js', (req, res) => {
            const js = [...bundler.bundleHashes.keys()].find(s => s.endsWith('.js'))
            res.sendFile(js)
        })
    },
    proxy: {
        '/api/*': 'http://localhost:5000'
    }
})