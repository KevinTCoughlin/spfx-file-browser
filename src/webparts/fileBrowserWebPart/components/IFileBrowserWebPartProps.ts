export interface IFileBrowserWebPartProps {
  description: string;
  getAuthToken: () => Promise<string>
}
