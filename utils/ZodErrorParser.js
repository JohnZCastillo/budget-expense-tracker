const ZodErrorParser = ({issues}) => {

    const result = {};

    issues.forEach(issue => {
        result[issue.path?.[0]] = issue.message;    
    });

    return result;
} 

module.exports = ZodErrorParser;