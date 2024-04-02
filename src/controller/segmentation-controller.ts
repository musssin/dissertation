import { Controller, Get, OnUndefined, Post, UploadedFile  } from 'routing-controllers';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async uploadImage(@UploadedFile('image') image: any): Promise<SegmentationResult> {
    console.log(image);
    const fileName = 'image.jpg';

    const segmentationResult: SegmentationResult = {
      toys: '',
      error: true
    };

    try {
      // Write the base64 data to a file
      await fs.promises.writeFile(fileName, image.buffer);

      await runPythonScript('dist/scripts/segmentation.py');


      const result = await readFile('results.json');
      const { classes } = JSON.parse(result?.toString());

      segmentationResult.error = false;
      segmentationResult.toys = classes;

    } catch (error) {
      console.log(error);

      throw new Error('Failed to save image');
    }
    return segmentationResult;
  }

}

function runPythonScript(scriptPath) {
  return new Promise((resolve, reject) => {
    console.log(scriptPath);
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