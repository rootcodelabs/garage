import json
import os
import argparse 

ap  = argparse.ArgumentParser()
ap.add_argument("-source-dir","--source-dir",type=str,help="Source JSON directory")
ap.add_argument("-save-dir-name","--save-dir-name",type=str,help="Formatted Data Save Directory")
ap.add_argument("-search-word","--search-text",type=str,help="Word to be searched and selected")
ap.add_argument("-replace-word","--replace-text",type=str,help="Word to replace")
ap.add_argument("-format","--format",type=str,help="Structure format option",default="true")
args = vars(ap.parse_args())
print(args)
ROOT_DIR =  args["source_dir"]  #Root Directory of files
SAVE_DIR = args["save_dir_name"] # Directory of where files should be saved



if( not os.path.exists(SAVE_DIR)):
    os.mkdir(SAVE_DIR)

def convert_NaN_Json(root_dir,save_dir,format=False):
        subfolder_index = 0 
        root_subfolders = os.listdir(root_dir)
        
        for folder in root_subfolders:
            file_index = 0
            subfolder_index += 1
            root_dir_sub_folder = os.path.join(root_dir,folder)
            save_dir_sub_folder = os.path.join(save_dir,folder)

            if(not os.path.exists(save_dir_sub_folder)):
                os.mkdir(save_dir_sub_folder)

            print("SUBFOLDER NAME : " ,folder)
            for json_loc_data  in os.listdir(root_dir_sub_folder):
                file_index += 1
                print("FILE NAME : ", json_loc_data)
                root_json_file_path = os.path.join(root_dir_sub_folder,json_loc_data)
                save_json_file_path = os.path.join(save_dir_sub_folder,json_loc_data)

                with open(root_json_file_path,'r') as json_file:
                    search_text = args["search_text"]
                    replace_text = args["replace_text"]
                    json_data = json.load(json_file)

                    
                        
                    if(format):
                        if(replace_text == 'NaN'):
                            formatted_json = json.dumps(json_data,indent=4,sort_keys=True).replace('NaN','"NaN"')
                        else:
                            formatted_json = json.dumps(json_data,indent=4,sort_keys=True).replace(search_text,replace_text)

                    else:
                        if(replace_text == 'NaN'):
                                formatted_json = json.dumps(json_data).replace('NaN','"NaN"')
                        else:
                                formatted_json = json.dumps(json_data).replace(search_text,replace_text)

                    with open(save_json_file_path,'w') as formatted_json_file:
                        formatted_json_file.write(formatted_json)
                        

#NOTE : Set format=True to structurally format the JSON file as well

if __name__ == '__main__':
    if(args['format'] == "true" or args['format'] == "True"):
        convert_NaN_Json(ROOT_DIR,SAVE_DIR,format=True)
    else:
        convert_NaN_Json(ROOT_DIR,SAVE_DIR)

# convertJSON(ROOT_DIR)

 