import IMailTemplateProvider from '../model/IMailTemplateProvider'

class FakeMailTemplateProvider implements IMailTemplateProvider {

    public async parse(): Promise<string> {
        return 'Mail Template'
    }
}

export default FakeMailTemplateProvider
