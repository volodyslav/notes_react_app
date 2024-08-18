import { SquidService, secureDatabase, executable } from '@squidcloud/backend';

export class ExampleService extends SquidService {
  @secureDatabase('all', 'built_in_db')
  allowAccessToBuiltInDb(): boolean {
    return true;
  }
  
  @executable()
  async askQuestion(question: string): Promise<string> {
    const responce = await this.squid.ai().executeAiQuery('built_in_db', question);
    return responce.answer;
  }
}
