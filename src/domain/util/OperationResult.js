module.exports = function(isSuccess, description, params = {}) {
    this.isSuccess = isSuccess;
    this.description = description;
    this.params = params;

    this.isOk = function() {
        return isSuccess === true;
    };

    this.isFailed = function() {
        return !this.isOk()
    }
}