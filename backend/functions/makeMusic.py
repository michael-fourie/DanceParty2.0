import json
from pydub import AudioSegment
import random
import os
import simpleaudio

def main(data):
    #Get all positions from dance into an array
    positions = getPositions(data)

    #Get all timestamps of positions into an array
    timestamps = getTimestamps(data)

    #Decide on a background drum loop, and get the AduioSegment of it
    backgroundDrumLoop = setDrums(timestamps[-1], len(positions))

    #Make the drum loop play for as long as the submitted video is in length
    backgroundDrumLoopCorrected = correctDrumLoop(backgroundDrumLoop, timestamps[-1])

    #Get an array of AudioSegment objects corresponding to the positions
    positionAudioSegments = getPosAudioSegements(positions)

    #Add the AudioSegments of the positions to the background drums at their respective timestamps
    finalSong = addPosSoundToDrums(backgroundDrumLoopCorrected, positionAudioSegments, timestamps)

    curDir = os.getcwd()
    newCurDir = curDir.replace(os.sep, '/')
    finalSong.export(newCurDir + "/sounds/final-song/final.wav", format="wav")




def getPositions(data):
    """
    Get the positions that were determined by the neural network model
    :param data: JSON Object
    :return: Array of dance positions
    """
    positions = data['pos']
    return positions


def getTimestamps(data):
    """
    Get the time stamps for each position
    :param data: JSON Object
    :return: Array of timestamps
    """
    timestamps = data['time']
    return timestamps


def setDrums(endOfVideoTime, numPositions):
    """
    Choose which background drum loop to play based on how long the dance was
    and how many moves were made
    :param endOfVideoTime: The time in ms for how long dance was
    :param numPositions: The number of dance positions the user made
    :return: Which drum loop should be played
    """
    speedOfDance = numPositions / (endOfVideoTime / 1000)
    curDir = os.getcwd()
    newCurDir = curDir.replace(os.sep, '/')


    if speedOfDance >= 2:
        drums = newCurDir + '/sounds/drum-loops/slow-paced-drumloop.wav'
    elif speedOfDance < 2 and speedOfDance >= 1:
        randint = random.randint(1,3)

        if randint == 1:
            drums = newCurDir + '/sounds/drum-loops/medium-paced-scifi-drumloop.wav'
        elif randint == 2:
            drums = newCurDir + '/sounds/drum-loops/medium-paced-drumloop.wav'
        else:
            drums = newCurDir + '/sounds/drum-loops/med-fast-paced-drumloop.wav'
    elif speedOfDance < 1:
        drums = newCurDir + '/sounds/drum-loops/fast-paced-drumloop.wav'

    backgroundDrums = AudioSegment.from_file(drums)

    return backgroundDrums


def correctDrumLoop(drumLoop, timeOfDance):
    """
    makes the background drum loop for the entirety of the dance
    :param drumLoop: an AudioSegment of the selected background drum loop
    :return: an AduioSegment of the selected background drum loop, corrected in its time lenght
    """
    timeOfDanceSeconds = timeOfDance / 1000
    timeOfDrumLoop = drumLoop.duration_seconds
    curTime = 0
    numRepeat = 1

    if timeOfDanceSeconds > timeOfDrumLoop:
        while curTime < timeOfDanceSeconds:
            curTime += timeOfDrumLoop
            numRepeat += 1

    drumLoopCorrected = drumLoop * numRepeat

    return drumLoopCorrected



def getPosAudioSegements(positions):
    """
    Given an array of positions, create an array of audio segments matching the positions
    :param positions: array of dance positions
    :return: array of AudioSegmants corresponding to the positions
    """

    positionList = []

    curDir = os.getcwd()
    newCurDir = curDir.replace(os.sep, '/')

    fortfive_left_path = newCurDir + '/sounds/position-sounds/45-left.wav'
    fortyfive_right_path = newCurDir + '/sounds/position-sounds/45-right.wav'
    a_pose_path = newCurDir + '/sounds/position-sounds/a-pose.wav'
    backward_c_path = newCurDir + '/sounds/position-sounds/backward-c.wav'
    c_pose_path = newCurDir + '/sounds/position-sounds/c-pose.wav'
    double_down_pump_path = newCurDir + '/sounds/position-sounds/double-down-pump.wav'
    double_fist_pump_up_path = newCurDir + '/sounds/position-sounds/double-fist-pump-up.wav'
    double_up_pump_path = newCurDir + '/sounds/position-sounds/double-up-pump.wav'
    down_circle_path = newCurDir + '/sounds/position-sounds/down-circle.wav'
    left_fist_pump_path = newCurDir + '/sounds/position-sounds/left-fist-pump.wav'
    left_fist_pump_up_path = newCurDir + '/sounds/position-sounds/left-fist-pump-up.wav'
    left_lean_path = newCurDir + '/sounds/position-sounds/left-lean.wav'
    left_up_right_down_path = newCurDir + '/sounds/position-sounds/left-up-right-down.wav'
    m_pose_path = newCurDir + '/sounds/position-sounds/m-pose.wav'
    no_pose_path = newCurDir + '/sounds/position-sounds/no-pose.wav'
    right_fist_pump_path = newCurDir + '/sounds/position-sounds/right-fist-pump.wav'
    right_fist_pump_up_path = newCurDir + '/sounds/position-sounds/right-fist-pump-up.wav'
    right_lean_path = newCurDir + '/sounds/position-sounds/right-lean.wav'
    right_up_left_down_path = newCurDir + '/sounds/position-sounds/right-up-left-down.wav'
    t_pose_path = newCurDir + '/sounds/position-sounds/t-pose.wav'
    upside_down_y_pose_path  = newCurDir + '/sounds/position-sounds/upside-down-y-pose.wav'
    y_pose_path = newCurDir + '/sounds/position-sounds/y-pose.wav'

    fortfive_left = AudioSegment.from_file(fortfive_left_path)
    fortyfive_right = AudioSegment.from_file(fortyfive_right_path)
    a_pose = AudioSegment.from_file(a_pose_path)
    backward_c = AudioSegment.from_file(backward_c_path)
    c_pose = AudioSegment.from_file(c_pose_path)
    double_down_pump = AudioSegment.from_file(double_down_pump_path)
    double_fist_pump_up = AudioSegment.from_file(double_fist_pump_up_path)
    double_up_pump = AudioSegment.from_file(double_up_pump_path)
    down_circle = AudioSegment.from_file(down_circle_path)
    left_fist_pump = AudioSegment.from_file(left_fist_pump_path)
    left_fist_pump_up = AudioSegment.from_file(left_fist_pump_up_path)
    left_lean = AudioSegment.from_file(left_lean_path)
    left_up_right_down = AudioSegment.from_file(left_up_right_down_path)
    m_pose = AudioSegment.from_file(m_pose_path)
    no_pose = AudioSegment.from_file(no_pose_path)
    right_fist_pump =  AudioSegment.from_file(right_fist_pump_path)
    right_fist_pump_up = AudioSegment.from_file(right_fist_pump_up_path)
    right_lean = AudioSegment.from_file(right_lean_path)
    right_up_left_down = AudioSegment.from_file(right_up_left_down_path)
    t_pose = AudioSegment.from_file(t_pose_path)
    upside_down_y_pose = AudioSegment.from_file(upside_down_y_pose_path)
    y_pose = AudioSegment.from_file(y_pose_path)

    for pos in range(len(positions)):
        curPos = positions[pos]

        if curPos == 'Y pose':
            positionList.append(y_pose)
        elif curPos == 'M pose':
            positionList.append(m_pose)
        elif curPos == 'C pose':
            positionList.append(c_pose)
        elif curPos == 'A pose':
            positionList.append(a_pose)
        elif curPos == 'T pose':
            positionList.append(t_pose)
        elif curPos == '45 Right Pose':
            positionList.append(fortyfive_right)
        elif curPos == '45 left Pose':
            positionList.append(fortfive_left)
        elif curPos == 'no Pose':
            positionList.append(no_pose)
        elif curPos == 'Right fist pump':
            positionList.append(right_fist_pump)
        elif curPos == 'Left fist pump':
            positionList.append(left_fist_pump)
        elif curPos == 'Double pump up':
            positionList.append(double_up_pump)
        elif curPos == 'Double pump down':
            positionList.append(double_down_pump)
        elif curPos == 'Right up left down':
            positionList.append(right_up_left_down)
        elif curPos == 'Left up right down':
            positionList.append(left_up_right_down)
        elif curPos == 'Down Y':
            positionList.append(upside_down_y_pose)
        elif curPos == 'Right fist up':
            positionList.append(right_fist_pump_up)
        elif curPos == 'left fist up':
            positionList.append(left_fist_pump_up)
        elif curPos == 'double fist up':
            positionList.append(double_fist_pump_up)
        elif curPos == 'right lean':
            positionList.append(right_lean)
        elif curPos == 'left lean':
            positionList.append(left_lean)
        elif curPos == 'down circle':
            positionList.append(down_circle)
        elif curPos == 'backwards c':
            positionList.append(backward_c)

    return positionList


def addPosSoundToDrums(backgroundDrumLoopCorrected, positionAudioSegments, timestamps):
    """
    This function will produce the final song for the dance. It will add the AdioSegments of each position
    on top of the drum loop at each specified timestamp
    :param backgroundDrumLoopCorrected: The background drum music
    :param positionAudioSegments: An array of AudioSegments for each position
    :param timestamps: An array of timestamps for each position
    :return: An audiosegmant of the final song
    """

    for sound in range(len(positionAudioSegments)):
        backgroundDrumLoopCorrected = backgroundDrumLoopCorrected.overlay(positionAudioSegments[sound], position=timestamps[sound])
    return backgroundDrumLoopCorrected

