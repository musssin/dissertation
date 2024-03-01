import { Body, Controller, Get, OnUndefined, Post, } from 'routing-controllers';
import 'reflect-metadata';
import { SegmentationResult } from 'src/models/SegmentationResult';
import fs from 'fs';
import { spawnSync } from 'child_process';
import { readFile } from 'fs/promises';
@Controller()
export class SegmentationController {

  @Get('/segmentation')
  init() {

    // application.locals.blockchain = blockchain;
    return 's';
  }

  @Post('/segmentation')
  @OnUndefined(204)
  async uploadImage(@Body() data: { image: string }): Promise<string> {

    const base64Data = data.image.replace(/^data:image\/png;base64,/, '').replace(/^data:image\/jpeg;base64,/, '');
    const fileName = 'dist/scripts/image.jpg';

    const segmentationResult: SegmentationResult = {
      toys: [],
      image: '',
      error: true
    };

    try {
      // Write the base64 data to a file
      await fs.promises.writeFile(fileName, base64Data, 'base64');


      const pythonProcess = await spawnSync('python3', [
        'dist/scripts/segmentation.py',
        'segmentation',
        'dist/scripts/args.json',
        'dist/scripts/results.json'
      ]);
      const result = pythonProcess.stdout?.toString()?.trim();
      const error = pythonProcess.stderr?.toString()?.trim();

      const status = result === 'OK';
      if (status) {
        const buffer = await readFile('/usr/src/app/scripts/results.json');
        const resultParsed = JSON.parse(buffer?.toString());
        segmentationResult.error = false;
        segmentationResult.toys = resultParsed.classes;
        segmentationResult.image = resultParsed.imageBase64;
      } else {
        console.log(error);
      }

    } catch (error) {
      throw new Error('Failed to save image');
    }
    return 'ab';
  }

}