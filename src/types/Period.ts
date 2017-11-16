
export enum Period {
    Second = 1,
    Minute = Second * 60,
    Hour = Minute * 60,
    Day = Hour * 24,
    Week = Day * 7,
    Month = 365 * Day / 12,
    Year = 365 * Day
}
