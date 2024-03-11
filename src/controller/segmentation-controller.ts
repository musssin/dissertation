import { Body, Controller, Get, OnUndefined, Post, } from 'routing-controllers';
import 'reflect-metadata';
import { SegmentationResult } from 'src/models/SegmentationResult';
import fs from 'fs';
import { spawn } from 'child_process';
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
  async uploadImage(@Body() data: { image: string }): Promise<SegmentationResult> {

    const base64Data = data.image.replace(/^data:image\/png;base64,/, '').replace(/^data:image\/jpeg;base64,/, '');
    const fileName = 'dist/scripts/image.jpg';

    const segmentationResult: SegmentationResult = {
      toys: '',
      image: '',
      error: true
    };

    try {
      // Write the base64 data to a file
      await fs.promises.writeFile(fileName, base64Data, 'base64');

      await runPythonScript('dist/scripts/segmentation.py');

      const image = await readFile('dist/scripts/segmented-image.jpg');
      const base64Image = Buffer.from(image).toString('base64');

      const result = await readFile('dist/scripts/results.json');
      const { classes } = JSON.parse(result?.toString());

      segmentationResult.error = false;
      segmentationResult.toys = classes;
      segmentationResult.image = base64Image;

    } catch (error) {
      console.log(error);

      throw new Error('Failed to save image');
    }
    return segmentationResult;
  }

}

function runPythonScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const python = spawn('python', [scriptPath]);
    let data = '';

    python.stdout.on('data', (chunk) => {
      console.log('Pipe data from python script ...');
      data += chunk.toString();
    });

    python.on('close', (code) => {
      console.log(`Child process closed all stdio with code ${code}`);
      resolve(data);
    });

    python.on('error', (err) => {
      console.error('Error occurred while executing Python script:', err);
      reject(err);
    });
  });
}