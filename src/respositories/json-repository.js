const fs = require('fs');

class jsonRepository {

    async getData(name){
        const data = fs.readFileSync('src/db/db.json');
        const { db } = JSON.parse(data.toString());
        return db[`${name}`];
    }
}

module.exports=jsonRepository;