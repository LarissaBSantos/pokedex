class Pokemon{
    id;
    name;
    photo;
    types = [];
    abilities = [];
    type;
    weight;
    height;
    eggGroups = [];
    eggCycle;
    gender = {}
    genderRate;


    calculateGenderProportion(genderRate) {
        if (genderRate === -1) {
            return {
                female: 0,
                male: 0,
                genderless: true
            };
        }

        const femalePercentage = (genderRate / 8) * 100;
        const malePercentage = 100 - femalePercentage;

        return {
            female: femalePercentage,
            male: malePercentage,
            genderless: false
        }
    }
}
