module.exports = {
    // validates if an object is empty (true), otherwise (false)
    isEmptyObject: function(obj) {
        return !Object.keys(obj).length;
    },

    // parses the user config.json and validates json
    isValidJSON: function(obj) {
        try {
            JSON.parse(obj);
            return true;
        } catch (e) {
            return false;
        }
    }
};
