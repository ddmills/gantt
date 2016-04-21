module.exports = class Bay
{
    constructor(attributes)
    {
        this.shop = attributes.shop;
        this.name = attributes.name;
        this.stages = [];
        this.technicianCount = attributes.technicianCount;
    }
}
