//
//  ActionViewController.swift
//  Post to Hacker News
//
//  Created by Eric Lewis on 2/21/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import UIKit
import MobileCoreServices

class ActionViewController: UIViewController {

    @IBOutlet weak var imageView: UIImageView!

    override func viewDidLoad() {
        super.viewDidLoad()

        for item in self.extensionContext!.inputItems as! [NSExtensionItem] {
            for provider in item.attachments! as! [NSItemProvider] {
              let propertyList = String(kUTTypePropertyList)
              if provider.hasItemConformingToTypeIdentifier(propertyList) {
                provider.loadItem(forTypeIdentifier: propertyList, options: nil, completionHandler: { (item, error) in
                    let dictionary = item as! NSDictionary
                    OperationQueue.main.addOperation {
                      let results = dictionary[NSExtensionJavaScriptPreprocessingResultsKey] as! NSDictionary
                      
                      if let url = URL(string: results["url"] as! String) {
                        let title = results["title"] as! String
                        let selectorOpenURL = sel_registerName("openURL:")
                        let context = NSExtensionContext()
                        context.open(url as URL, completionHandler: nil)
    
                        var responder = self as UIResponder?
    
                        while (responder != nil){
                          if responder?.responds(to: selectorOpenURL) == true {
                            let scheme = "hackernews"
                            let host = "post"
                            let titleQueryItem = URLQueryItem(name: "title", value: title)
                            let urlQueryItem = URLQueryItem(name: "url", value: url.absoluteString)
                            
                            var urlComponents = URLComponents()
                            urlComponents.scheme = scheme
                            urlComponents.host = host
                            urlComponents.queryItems = [titleQueryItem, urlQueryItem]
                            responder?.perform(selectorOpenURL, with: urlComponents.url!)
                            self.extensionContext!.completeRequest(returningItems: nil, completionHandler: nil);
                          }
                          responder = responder!.next
                        }
                        
                      }
                    }
                })
              }
            }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func done() {
        // Return any edited content to the host app.
        // This template doesn't do anything, so we just echo the passed in items.
        self.extensionContext!.completeRequest(returningItems: nil, completionHandler: nil)
    }

}
