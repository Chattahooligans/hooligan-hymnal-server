const cache = require('memory-cache');

const memCache = new cache.Cache();

exports.inMemoryCacheMiddleware = (duration, key) => {
    return (req, res, next) => {
        let memKey = key ? key : req.originalUrl || req.url;
        let cacheContent = memCache.get(memKey);
        if (cacheContent) {
            console.log(`Cache for ${memKey} hit!`)
            return res.send( cacheContent );
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                memCache.put(memKey, body, duration)
                console.log(`Setting cache for ${memKey}`);
                res.sendResponse(body)
            }
            next();
        }
    }
}
