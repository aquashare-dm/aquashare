--Clear all DB info
DROP TABLE requests;
DROP TABLE confirmed_riders;
DROP TABLE riders;
DROP TABLE rides;
DROP TABLE drivers;
DROP TABLE boats;
DROP TABLE tiers;

CREATE TABLE "requests" (
	"request_id" serial NOT NULL,
	"request_date" varchar(255) NOT NULL,
	"request_location_lat" FLOAT(30) NOT NULL,
	"request_location_long" FLOAT(30) NOT NULL,
	"request_seat_number" integer NOT NULL,
	"tier_id" integer NOT NULL,
	"rider_id" integer NOT NULL,
	CONSTRAINT "requests_pk" PRIMARY KEY ("request_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "rides" (
	"ride_id" serial NOT NULL,
	"ride_date" varchar(255) NOT NULL,
	"driver_id" integer NOT NULL,
	"ride_location" varchar(255) NOT NULL,
	"ride_location_lat" FLOAT(30) NOT NULL,
	"ride_location_long" FLOAT(30) NOT NULL,
	"ride_total_seats" integer NOT NULL,
	"ride_open_seats" integer NOT NULL,
	"ride_start_time" integer NOT NULL,
	"ride_end_time" integer NOT NULL,
	CONSTRAINT "rides_pk" PRIMARY KEY ("ride_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tiers" (
	"tier_id" serial NOT NULL,
	"tier_name" varchar(255) NOT NULL,
	"tier_description" varchar(255) NOT NULL,
	"tier_price" FLOAT(2) NOT NULL,
	CONSTRAINT "tiers_pk" PRIMARY KEY ("tier_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "riders" (
	"rider_id" serial NOT NULL,
	"rider_username" varchar(255) NOT NULL UNIQUE,
	"rider_password" varchar(200) NOT NULL,
	"rider_email" varchar(60) UNIQUE,
	"rider_first_name" varchar(60),
	"rider_last_name" varchar(60),
	"rider_image_url" varchar(1000),
	"rider_rating" FLOAT(1),
	CONSTRAINT "riders_pk" PRIMARY KEY ("rider_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "drivers" (
	"driver_id" serial NOT NULL,
	"driver_username" varchar(60) NOT NULL UNIQUE,
	"driver_password" varchar(255) NOT NULL,
	"driver_email" varchar(60) UNIQUE,
	"driver_first_name" varchar(60),
	"driver_last_name" varchar(60),
	"driver_image_url" varchar(1000),
	"driver_rating" FLOAT(1),
	"driver_license" varchar(255),
	"boat_id" integer,
	CONSTRAINT "drivers_pk" PRIMARY KEY ("driver_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "boats" (
	"boat_id" serial NOT NULL,
	"boat_name" varchar(255),
	"tier_id" integer NOT NULL,
	"boat_description" varchar(400),
	"boat_license" varchar(255) NOT NULL,
	"boat_registration" varchar(255) NOT NULL,
	"boat_make" varchar(255) NOT NULL,
	"boat_model" varchar(255) NOT NULL,
	"boat_seat_number" integer NOT NULL,
	"boat_image_one" varchar(1000),
	"boat_image_two" varchar(1000),
	CONSTRAINT "boats_pk" PRIMARY KEY ("boat_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "confirmed_riders" (
	"ride_id" integer NOT NULL,
	"rider_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



ALTER TABLE "requests" ADD CONSTRAINT "requests_fk0" FOREIGN KEY ("tier_id") REFERENCES "tiers"("tier_id");
ALTER TABLE "requests" ADD CONSTRAINT "requests_fk1" FOREIGN KEY ("rider_id") REFERENCES "riders"("rider_id");

ALTER TABLE "rides" ADD CONSTRAINT "rides_fk0" FOREIGN KEY ("driver_id") REFERENCES "drivers"("driver_id");



ALTER TABLE "drivers" ADD CONSTRAINT "drivers_fk0" FOREIGN KEY ("boat_id") REFERENCES "boats"("boat_id");

ALTER TABLE "boats" ADD CONSTRAINT "boats_fk0" FOREIGN KEY ("tier_id") REFERENCES "tiers"("tier_id");

ALTER TABLE "confirmed_riders" ADD CONSTRAINT "confirmed_riders_fk0" FOREIGN KEY ("ride_id") REFERENCES "rides"("ride_id");
ALTER TABLE "confirmed_riders" ADD CONSTRAINT "confirmed_riders_fk1" FOREIGN KEY ("rider_id") REFERENCES "riders"("rider_id");
