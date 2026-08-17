-- CreateTable
CREATE TABLE `countries` (
    `CountryID` VARCHAR(2) NOT NULL,
    `CountryName` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`CountryID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `days` (
    `DayID` VARCHAR(40) NOT NULL,
    `Trip_id` VARCHAR(40) NOT NULL,
    `DayIndex` INTEGER NOT NULL,

    INDEX `days_Trip_id_idx`(`Trip_id`),
    PRIMARY KEY (`DayID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `places` (
    `PlaceID` VARCHAR(40) NOT NULL,
    `ExternalID` VARCHAR(50) NOT NULL,
    `Name` VARCHAR(100) NOT NULL,
    `Category` VARCHAR(50) NOT NULL,
    `Lat` FLOAT NOT NULL,
    `Lng` FLOAT NOT NULL,
    `CachedData` JSON NULL,

    UNIQUE INDEX `places_ExternalID_key`(`ExternalID`),
    PRIMARY KEY (`PlaceID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `ReviewID` VARCHAR(40) NOT NULL,
    `User_id` VARCHAR(40) NOT NULL,
    `Place_id` VARCHAR(40) NOT NULL,
    `Rating` INTEGER NOT NULL,
    `Comment` TEXT NOT NULL,
    `ImageURL` TEXT NOT NULL,

    INDEX `reviews_Place_id_idx`(`Place_id`),
    INDEX `reviews_User_id_idx`(`User_id`),
    PRIMARY KEY (`ReviewID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tripevents` (
    `EventID` VARCHAR(40) NOT NULL,
    `Day_id` VARCHAR(40) NOT NULL,
    `Place_id` VARCHAR(40) NOT NULL,
    `TripOrder` INTEGER NOT NULL,
    `StartTime` DATETIME(0) NOT NULL,
    `Notes` TEXT NULL,

    INDEX `tripevents_Day_id_idx`(`Day_id`),
    INDEX `tripevents_Place_id_idx`(`Place_id`),
    PRIMARY KEY (`EventID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trips` (
    `TripID` VARCHAR(40) NOT NULL,
    `User_Id` VARCHAR(40) NOT NULL,
    `TripName` VARCHAR(50) NOT NULL,
    `StartDate` DATE NOT NULL,
    `EndDate` DATE NOT NULL,

    INDEX `trips_User_Id_idx`(`User_Id`),
    PRIMARY KEY (`TripID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `UserID` VARCHAR(40) NOT NULL,
    `Firstname` VARCHAR(20) NOT NULL,
    `Lastname` VARCHAR(20) NOT NULL,
    `Username` VARCHAR(20) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `Password` VARCHAR(100) NULL,
    `Birth_date` DATE NULL,
    `Phone_number` VARCHAR(12) NULL,

    UNIQUE INDEX `users_Username_key`(`Username`),
    UNIQUE INDEX `users_Email_key`(`Email`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visited_countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(40) NOT NULL,
    `country_id` VARCHAR(2) NOT NULL,

    INDEX `visited_countries_country_id_idx`(`country_id`),
    UNIQUE INDEX `visited_countries_user_id_country_id_key`(`user_id`, `country_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `days` ADD CONSTRAINT `days_Trip_id_fkey` FOREIGN KEY (`Trip_id`) REFERENCES `trips`(`TripID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_Place_id_fkey` FOREIGN KEY (`Place_id`) REFERENCES `places`(`PlaceID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_User_id_fkey` FOREIGN KEY (`User_id`) REFERENCES `users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tripevents` ADD CONSTRAINT `tripevents_Day_id_fkey` FOREIGN KEY (`Day_id`) REFERENCES `days`(`DayID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tripevents` ADD CONSTRAINT `tripevents_Place_id_fkey` FOREIGN KEY (`Place_id`) REFERENCES `places`(`PlaceID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trips` ADD CONSTRAINT `trips_User_Id_fkey` FOREIGN KEY (`User_Id`) REFERENCES `users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visited_countries` ADD CONSTRAINT `visited_countries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visited_countries` ADD CONSTRAINT `visited_countries_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`CountryID`) ON DELETE CASCADE ON UPDATE CASCADE;
