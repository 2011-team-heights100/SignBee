import {
	Finger,
	FingerCurl,
	FingerDirection,
	GestureDescription,
} from "fingerpose";

export const middleFinger = new GestureDescription("How rude!");

//Index
middleFinger.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
middleFinger.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.60);

//Middle
middleFinger.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
middleFinger.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.80);
middleFinger.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.2);
middleFinger.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.2);

//Ring
middleFinger.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
middleFinger.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.60);

//Pinky
middleFinger.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
middleFinger.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.60);


