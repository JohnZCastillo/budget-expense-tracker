module.exports = (iss) => {

    const field =  iss.path[0];

    const type = iss.expected ?? iss.format ;

    const vowels = ['a','e','i','o','u'];

    const connector = vowels.includes( type.substring(0,1)) ? 'an' : 'a';

    return iss.input === undefined 
        ? `${field} is required.` 
        : `${field} must be ${connector} ${type}.`
}

module.export