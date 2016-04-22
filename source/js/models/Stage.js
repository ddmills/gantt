module.exports = class Stage
{
    constructor(attributes)
    {
        this.bay = attributes.bay;
        this.shop = attributes.shop;
        this.status = attributes.status;
        this.orderNo = attributes.orderNo;
        this.stageNo = attributes.stageNo;
        this.workType = attributes.workType;
        this.customer = attributes.customer;
        this.progress = attributes.progress;
        this.duration = attributes.duration;
        this.startDate = attributes.startDate;
        this.lockStartDate = attributes.lockStartDate;
    }
}
