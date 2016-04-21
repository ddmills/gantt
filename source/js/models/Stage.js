module.exports = class Stage
{
    constructor(attributes)
    {
        this.bay = attributes.bay;
        this.shop = attributes.shop;
        this.orderNo = attributes.orderNo;
        this.stageNo = attributes.stageNo;
        this.duration = attributes.duration;
        this.startDate = attributes.startDate;
        this.lockStartDate = attributes.lockStartDate;
    }
}
